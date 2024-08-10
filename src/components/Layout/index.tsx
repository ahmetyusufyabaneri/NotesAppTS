import { Navigate, Outlet, useParams } from "react-router-dom";
import { INote } from "../../types";

type LayoutProps = {
  notes: INote[];
};

const Layout = ({ notes }: LayoutProps) => {
  const { id } = useParams();

  const found = notes.find((note) => note.id == id);

  if (!found) return <Navigate to={"/"} replace />;

  return <Outlet context={found} />;
};

export default Layout;
