const NoNotesView = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[50%]">
      <div className="flex flex-col items-center justify-center gap-4">
        <img src="/public/assets/Page-Large-Icon.svg" alt="page" />
        <h2 className="text-white text-3xl text-center font-semibold">
          Select a note to view
        </h2>
        <p className="text-[#FFFFFF99] text-center">
          Choose a note from the list on the left to view it's content, or
          create a new note to add to your collection
        </p>
      </div>
    </div>
  );
};
export default NoNotesView;
