import CustomForm from "../../components/CustomForm";
import { INoteData, ITag } from "../../types";

export type CreatePageProps = {
  handleSubmit: (noteData: INoteData) => void;
  createTag: (tag: ITag) => void;
  availableTags: ITag[];
};

const CreatePage = ({
  handleSubmit,
  createTag,
  availableTags,
}: CreatePageProps) => {
  return (
    <div className="container py-5">
      <h2>Create New Note</h2>
      <CustomForm
        handleSubmit={handleSubmit}
        createTag={createTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default CreatePage;
