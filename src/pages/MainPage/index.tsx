import { Button, Stack } from "react-bootstrap";
import { INote, ITag } from "../../types";
import { Link } from "react-router-dom";

type MainPageProps = {
  notes: INote[];
  availableTags: ITag[];
};

const MainPage = ({ notes, availableTags }: MainPageProps) => {
  return (
    <div className="container py-5">
      <Stack direction="horizontal">
        <h1>Notes</h1>
        <Link to={"/new"}>
          <Button>Create</Button>
        </Link>
      </Stack>
    </div>
  );
};

export default MainPage;
