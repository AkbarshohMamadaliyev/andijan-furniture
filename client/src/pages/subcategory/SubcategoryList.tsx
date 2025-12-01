import "./SubcategoryList.css";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import type { ISubcategory } from "../../types/subcategory";
import api from "../../services/api";
import { Toaster, toast } from "sonner";

const SubcategoryList: React.FC = () => {
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const { data: res } = await api.get("/admin/subcategory");
        setSubcategories(res?.data);
      } catch (error) {
        console.error(`Failed to fetch subcategories: ${error}`);
      }
    };

    fetchSubcategories();
  }, []);

  const deleteCategory = async (id: number) => {
    try {
      const { data: res } = await api.delete(`/admin/subcategory/${id}`);
      if (res.success === true) {
        toast.success("Subkategoriya muvaffaqiyatli o'chirildi!");
        setSubcategories((prev) =>
          prev.filter((subcategory) => subcategory.id !== id)
        );
      }
    } catch (error) {
      console.error(`Failed to delete the category: ${error}`);
    }
  };

  return (
    <div className="subcategory">
      <Toaster position="top-right" richColors />

      <div className="subcategory-header">
        <h1 className="subcategory-title">Barcha Subkategoriyalar</h1>
        <Link to="/subcategory/add" className="subcategory-link">
          <IoIosAddCircleOutline size={20} />
          <p className="add-subcategory">Subkategoriya qo'shish</p>
        </Link>
      </div>
      <table className="subcategory-table">
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
          {subcategories.map((subcategory, index) => (
            <tr key={subcategory.id}>
              <td>{index + 1}</td>
              <td>{subcategory.title}</td>
              <td>
                <img
                  src={subcategory.image}
                  alt="subcategory image"
                  className="subcategory-img"
                />
              </td>
              <td>{subcategory.status}</td>
              <td>
                <Link to={`/subcategory/edit/${subcategory.id}`}>
                  <FaRegEdit size={17} className="edit-subcategory" />
                </Link>
              </td>
              <td>
                <RiDeleteBin7Line
                  size={18}
                  className="delete-subcategory"
                  onClick={() => deleteCategory(subcategory.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubcategoryList;
