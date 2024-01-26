interface DeleteModalProps {
  _id: string;
  display: boolean;
  setModal: Function;
  imageTitle: string;
  apiUrl: string;
}

export function DeleteModal({
  _id,
  display,
  setModal,
  imageTitle,
  apiUrl,
}: DeleteModalProps) {
  function handleModalClose() {
    setModal(false);
  }
  function handleDelete(e: any) {
    e.preventDefault();
    const password = e.target.password.value;
    const data = {
      password,
    };
    fetch(`${apiUrl}/deleteImage/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      res.json().then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        window.location.reload();
      });
    });
  }
  if (!display) return <></>;
  return (
    <div className="modal">
      <div className="modal__background"></div>
      <div className="modal__inner">
        <div className="modal__content">
          <div className="modal__title">Apagar imagem</div>
          <form onSubmit={handleDelete}>
            <div className="modal__text">
              Insira a senha para apagar a imagem: {imageTitle}
            </div>
            <input type="text" name="password" required />
            <div className="modal__button-wrapper">
              <button
                className="modal__button modal__button--delete"
                type="submit"
              >
                Apagar
              </button>
              <div
                className="modal__button modal__button--cancel"
                onClick={handleModalClose}
              >
                Cancelar
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
