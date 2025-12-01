import "./EditCategory.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdOutlineUploadFile } from "react-icons/md";
import Button from "../../components/ui/button/Button";
import api from "../../services/api";
import { Toaster, toast } from "sonner";

const EditCategory: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [order, setOrder] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data: res } = await api.get(`/admin/category/${id}`);
        setTitle(res?.data?.title);
        setStatus(res?.data?.status);
        setOrder(res?.data?.order);
        setImage(res?.data?.image);
      } catch (error) {
        console.error(`Failed to fetch categories: ${error}`);
      }
    };

    fetchCategory();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("status", status);
      formData.append("order", order);
      if (image) formData.append("image", image);

      await api.patch(`/admin/category/${id}`, formData);

      navigate("/category");
    } catch (error) {
      console.error(`Failed to update category: ${error}`);
      toast.error("Kategoriya yangilanishida xatolik yuz berdi!");
    }
  };

  return (
    <div className="editcategory">
      <Toaster position="top-right" richColors />

      <div className="editcategory-header">
        <Link to="/category" className="editcategory-back">
          <IoArrowBackCircleOutline size={23} />
        </Link>

        <h1 className="editcategory-title">Kategoriya tahrirlash</h1>
      </div>
      <form onSubmit={handleUpdate}>
        <div className="editcategory-form">
          <div className="form-group">
            <label>Sarlavha</label>
            <input
              type="text"
              defaultValue={title}
              placeholder="Sarlavha"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Holati</label>
            <input
              type="text"
              defaultValue={status}
              placeholder="active, inactive"
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Tartib</label>
            <input
              type="text"
              defaultValue={order}
              placeholder="Masalan: 0, 1, 2..."
              onChange={(e) => setOrder(e.target.value)}
            />
          </div>
        </div>
        <div className="editcategory-upload">
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
        <div className="editcategory-btn">
          <Button type="submit" label="Saqlash" variant="success" />
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
