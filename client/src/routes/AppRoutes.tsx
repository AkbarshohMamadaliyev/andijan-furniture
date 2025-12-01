import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/login/Login";
import Layout from "../components/layout/layout/Layout";
import Home from "../pages/home/Home";
import CategoryList from "../pages/category/CategoryList";
import AddCategory from "../pages/category/AddCategory";
import EditCategory from "../pages/category/EditCategory";
import SubcategoryList from "../pages/subcategory/SubcategoryList";
import AddSubcategory from "../pages/subcategory/AddSubcategory";
import EditSubCategory from "../pages/subcategory/EditSubcategory";
import ProductList from "../pages/product/ProductList";
import Setting from "../pages/setting/Setting";
import NotFound from "../pages/not-found/NotFound";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<Home />} />
        <Route path="/category" element={<CategoryList />} />
        <Route path="/category/add" element={<AddCategory />} />
        <Route path="/category/edit/:id" element={<EditCategory />} />
        <Route path="/subcategory" element={<SubcategoryList />} />
        <Route path="/subcategory/add" element={<AddSubcategory />} />
        <Route path="/subcategory/edit/:id" element={<EditSubCategory />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="/setting" element={<Setting />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
