import { useOutletContext } from "react-router-dom";
import CustomForm from "../../components/CustomForm";
import { INote, INoteData, ITag } from "../../types";

type EditPageProps = {
  availableTags: ITag[];
  createNewTag: (tag: ITag) => void;
  onSubmit: (id: string, updatedData: INoteData) => void;
};

const EditPage = ({ availableTags, createNewTag, onSubmit }: EditPageProps) => {
  const found: INote = useOutletContext();
  return (
    <div className="container my-5">
      <h2 className="mb-4">Edit Note</h2>
      <CustomForm
        createTag={createNewTag}
        availableTags={availableTags}
        handleSubmit={(updatedNote) => onSubmit(found.id, updatedNote)}
        title={found.title}
        markdown={found.markdown}
        tags={found.tags}
      />
    </div>
  );
};

export default EditPage;
