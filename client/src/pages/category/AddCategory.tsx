import "./AddCategory.css";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdOutlineUploadFile } from "react-icons/md";
import Button from "../../components/ui/button/Button";
import { useState } from "react";
import api from "../../services/api";
import { Toaster, toast } from "sonner";

const AddCategory: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [order, setOrder] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !status || !image) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("status", status);
      formData.append("order", order);
      formData.append("image", image);

      await api.post("/admin/category", formData);

      navigate("/category");
    } catch (error) {
      console.error(`Failed to post categories: ${error}`);
      toast.error("Kategoriya yaratishda xatolik yuz berdi!");
    }
  };

  return (
    <div className="addcategory">
      <Toaster position="top-right" richColors />

      <div className="addcategory-header">
        <Link to="/category" className="addcategory-back">
          <IoArrowBackCircleOutline size={23} />
        </Link>
        <h1 className="addcategory-title">Kategoriya qo’shish</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="addcategory-form">
          <div className="form-group">
            <label>Sarlavha</label>
            <input
              type="text"
              value={title}
              placeholder="Sarlavha"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Holati</label>
            <input
              type="text"
              value={status}
              placeholder="active, inactive"
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Tartib</label>
            <input
              type="text"
              value={order}
              placeholder="Masalan: 0, 1, 2..."
              onChange={(e) => setOrder(e.target.value)}
            />
          </div>
        </div>
        <div className="addcategory-upload">
          <label htmlFor="file-upload" className="upload-label">
            <MdOutlineUploadFile className="upload-icon" />
            {image?.name ? (
              <p className="upload-text">{image.name}</p>
            ) : (
              <p className="upload-text">
                Rasm yuklash uchun belgi ustiga bosing.
              </p>
            )}
          </label>
          <input
            type="file"
            id="file-upload"
            name="image"
            className="upload-input"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImage(file);
                console.log("Uploaded file:", file.name);
              }
            }}
          />
        </div>
        <div className="addcategory-btn">
          <Button type="submit" label="Saqlash" variant="success" />
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
