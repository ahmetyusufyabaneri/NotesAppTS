import { Badge, Card, Stack } from "react-bootstrap";
import { INote } from "../../types";
import styles from "./card.module.css";
import { useNavigate } from "react-router-dom";

type CardProps = {
  note: INote;
};

const NoteCard = ({ note }: CardProps) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/${note.id}`)} className={styles.noteCard}>
      <Card.Body>
        <Stack
          gap={2}
          className="h-100 align-items-center justify-content-between"
        >
          <span className="fw-bold">{note.title}</span>
          <Stack
            direction="horizontal"
            gap={1}
            className="justify-content-center"
          >
            {note.tags?.map((tag, index) => (
              <Badge key={index}>{tag.label}</Badge>
            ))}
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;
