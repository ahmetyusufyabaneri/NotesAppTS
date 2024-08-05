import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { ITag } from "../../types";
import { CreatePageProps } from "../../pages/CreatePage";
import { v4 } from "uuid";

const CustomForm = ({
  availableTags,
  handleSubmit,
  createTag,
}: CreatePageProps) => {
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();

    handleSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    navigate(-1);
  };
  return (
    <Form onSubmit={handleSend}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                onChange={(all_tags) => console.log(all_tags)}
                onCreateOption={(text) => {
                  const newTag: ITag = { label: text, value: v4() };

                  createTag(newTag);

                  setSelectedTags([...selectedTags, newTag]);
                }}
                options={availableTags}
                value={selectedTags}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Content</Form.Label>
          <Form.Control
            ref={markdownRef}
            as={"textarea"}
            rows={12}
            required
            className="max-h"
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Button
            onClick={() => navigate("/")}
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default CustomForm;
