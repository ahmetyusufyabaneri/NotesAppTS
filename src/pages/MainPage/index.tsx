import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { INote, ITag } from "../../types";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { useMemo, useState } from "react";
import NoteCard from "../../components/NoteCard";

type MainPageProps = {
  notes: INote[];
  availableTags: ITag[];
};

const MainPage = ({ notes, availableTags }: MainPageProps) => {
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);

  const filteredNotes = useMemo(
    () =>
      notes.filter((note) => {
        return (
          //1) note'un başlığı aratılan metni içeriyorsa note'u döndür
          (title === "" ||
            note.title.toLowerCase().includes(title.toLowerCase())) &&
          //2) seçtiğim etiketlerin tamamı notta varsa note'u döndür
          (selectedTags.length === 0 ||
            selectedTags.every((s_tag) =>
              note.tags.some((noteTag) => noteTag.value === s_tag.value)
            ))
        );
      }),
    [title, selectedTags, notes]
  );

  return (
    <div className="container py-5">
      <Stack
        direction="horizontal"
        className="justify-content-between align-items-center"
      >
        <h1>Notes</h1>
        <Link to={"/new"}>
          <Button>Create</Button>
        </Link>
      </Stack>
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Search for Title</Form.Label>
              <Form.Control onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Search for Tag</Form.Label>
              <ReactSelect
                isMulti
                onChange={(all_tags) => setSelectedTags(all_tags)}
                options={availableTags}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="mt-4 gap-4">
        {filteredNotes.map((note, index) => (
          <Col key={index}>
            <NoteCard note={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MainPage;
