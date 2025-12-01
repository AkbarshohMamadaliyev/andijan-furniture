import "./CategoryList.css";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import type { ICategory } from "../../types/category";
import api from "../../services/api";
import { Toaster, toast } from "sonner";

const CategoryList: React.FC = () => {
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

  const deleteCategory = async (id: number) => {
    try {
      const { data: res } = await api.delete(`/admin/category/${id}`);
      if (res.success === true) {
        toast.success("Kategoriya muvaffaqiyatli o'chirildi!");
        setCategories((prev) => prev.filter((category) => category.id !== id));
      }
    } catch (error) {
      console.error(`Failed to delete the category: ${error}`);
    }
  };

  console.log("categories", categories);
  

  return (
    <div className="category">
      <Toaster position="top-right" richColors />

      <div className="category-header">
        <h1 className="category-title">Barcha Kategoriyalar</h1>
        <Link to="/category/add" className="category-link">
          <IoIosAddCircleOutline size={20} />
          <p className="add-category">Kategoriya qo'shish</p>
        </Link>
      </div>
      <table className="category-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Sarlavha</th>
            <th>Rasm</th>
            <th>Holat</th>
            <th>Tahrirlash</th>
            <th>O'chirish</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id}>
              <td>{index + 1}</td>
              <td>{category.title}</td>
              <td>
                <img
                  src={category.image}
                  alt="category image"
                  className="category-img"
                />
              </td>
              <td>{category.status}</td>
              <td>
                <Link to={`/category/edit/${category.id}`}>
                  <FaRegEdit size={17} className="edit-category" />
                </Link>
              </td>
              <td>
                <RiDeleteBin7Line
                  size={18}
                  className="delete-category"
                  onClick={() => deleteCategory(category.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
