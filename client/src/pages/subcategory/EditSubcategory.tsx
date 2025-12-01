import "./EditSubcategory.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdOutlineUploadFile } from "react-icons/md";
import Button from "../../components/ui/button/Button";
import type { ICategory } from "../../types/category";
import api from "../../services/api";
import { Toaster, toast } from "sonner";

const EditSubCategory: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch subcategory data:
        const { data: subRes } = await api.get(`/admin/subcategory/${id}`);
        setTitle(subRes?.data?.title);
        setStatus(subRes?.data?.status);
        setCategoryId(subRes?.data?.categoryId);
        setImage(subRes?.data?.image);

        // fetch category data:
        const { data: catRes } = await api.get("/admin/category");
        setCategories(catRes?.data);
      } catch (error) {
        console.error(`Failed to fetch subcategories: ${error}`);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("status", status);
      formData.append("categoryId", categoryId);
      if (image) formData.append("image", image);

      await api.patch(`/admin/subcategory/${id}`, formData);

      navigate("/subcategory");
    } catch (error) {
      console.error(`Failed to update subcategory: ${error}`);
      toast.error("Subkategoriya yangilanishida xatolik yuz berdi!");
    }
  };

  return (
    <div className="editsubcategory">
      <Toaster position="top-right" richColors />

      <div className="editsubcategory-header">
        <Link to="/subcategory" className="editsubcategory-back">
          <IoArrowBackCircleOutline size={23} />
        </Link>
        <h1 className="editsubcategory-title">Subkategoriya tahrirlash</h1>
      </div>
      <form onSubmit={handleUpdate}>
        <div className="editsubcategory-form">
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
        <div className="editsubcategory-upload">
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
        <div className="editsubcategory-btn">
          <Button type="submit" label="Saqlash" variant="success" />
        </div>
      </form>
    </div>
  );
};

export default EditSubCategory;
