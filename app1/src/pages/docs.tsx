import { history } from "umi";

const DocsPage = () => {
  return (
    <div>
      <p>This is umi docs.</p>
      <button
        onClick={() => {
          window.location.reload();
        }}
      >刷新</button>
    </div>
  );
};

export default DocsPage;
