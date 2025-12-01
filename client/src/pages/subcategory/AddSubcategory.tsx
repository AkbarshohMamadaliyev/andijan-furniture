import "./AddSubcategory.css";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdOutlineUploadFile } from "react-icons/md";
import Button from "../../components/ui/button/Button";
import { useEffect, useState } from "react";
import type { ICategory } from "../../types/category";
import api from "../../services/api";
import { Toaster, toast } from "sonner";

const AddSubcategory: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data: res } = await api.get("/admin/category");
        setCategories(res?.data);
      } catch (error) {
        console.error(`Failed to fetch categories: ${error}`);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !status || !categoryId || !image) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("status", status);
      formData.append("categoryId", categoryId);
      formData.append("image", image);

      await api.post("/admin/subcategory", formData);

      navigate("/subcategory");
    } catch (error) {
      console.error(`Failed to post categories: ${error}`);
      toast.error("Subkategoriya yaratishda xatolik yuz berdi!");
    }
  };

  return (
    <div className="addsubcategory">
      <Toaster position="top-right" richColors />

      <div className="addsubcategory-header">
        <Link to="/subcategory" className="addsubcategory-back">
          <IoArrowBackCircleOutline size={23} />
        </Link>
        <h1 className="addsubcategory-title">Subkategoriya qo’shish</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="addsubcategory-form">
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
            <label>Kategoriya</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Kategoriya tanlang</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="addsubcategory-upload">
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
        <div className="addsubcategory-btn">
          <Button type="submit" label="Saqlash" variant="success" />
        </div>
      </form>
    </div>
  );
};

export default AddSubcategory;
