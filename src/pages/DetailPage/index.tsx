import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { INote } from "../../types";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import Markdown from "react-markdown";

type DetailPageProps = {
  deleteNote: (id: string) => void;
};

const DetailPage = ({ deleteNote }: DetailPageProps) => {
  console.log(deleteNote);
  const found: INote = useOutletContext();

  const navigate = useNavigate();
  return (
    <div className="container py-5">
      <Row>
        <Col>
          <h1>{found.title}</h1>
          <Stack direction="horizontal" gap={2} className="flex-wrap">
            {found.tags.map((tag, index) => (
              <Badge key={index}>{tag.label}</Badge>
            ))}
          </Stack>
        </Col>
        <Col>
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Button onClick={() => navigate("edit")} variant="outline-primary">
              Edit
            </Button>
            <Button
              onClick={() => deleteNote(found.id)}
              variant="outline-danger"
            >
              Delete
            </Button>
            <Button onClick={() => navigate("/")} variant="outline-secondary">
              Back
            </Button>
          </Stack>
        </Col>
      </Row>
      <Markdown className="my-5">{found.markdown}</Markdown>
    </div>
  );
};

export default DetailPage;
