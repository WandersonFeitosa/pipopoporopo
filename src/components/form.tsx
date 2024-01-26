interface FormProps {
  apiUrl: string;
}

async function postUrl(url: string, data: any) {
  const response = await fetch(url, {
    method: "POST",
    body: data,
  });
  const submitButton = document.querySelector(
    ".form__submit"
  ) as HTMLButtonElement;

  submitButton.disabled = false;

  console.log(response);
  if (response.status != 200) {
    const json = await response.json();
    alert(json.error);
    return;
  }

  alert("Imagem enviada com sucesso");
  window.location.reload();
}

export function Form({ apiUrl }: FormProps) {
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const fileInput = e.target as HTMLInputElement;
    const thumbnail = document.querySelector(
      ".file__thumbnail"
    ) as HTMLImageElement;
    const file = fileInput.files![0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        thumbnail.src = reader.result as string;
        thumbnail.style.marginTop = "1.5rem";
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = document.querySelector("#sign-image") as HTMLFormElement;
    const formData = new FormData(form);
    const submitButton = document.querySelector(
      ".form__submit"
    ) as HTMLButtonElement;

    submitButton.disabled = true;

    postUrl(`${apiUrl}/postImage`, formData);
  }

  return (
    <div className="form">
      <div className="container">
        <div className="form__wrapper">
          <div className="form__col">
            <h1>Artes NCSMP</h1>
            <p>
              Envie aqui a sua arte para termos ela guardada em um lugar
              especial e termos uma maneira fácil de expor elas.
            </p>
            <p>
              Sinta-se livre pra escrever os nomes e nicks da maneira que as
              pessoas se referem.
            </p>
            <p>NÃO USE SENHAS IMPORTANTES PRA VOCÊ, USA QUALQUER COISA BOBA</p>

            <p>
              Para gerar seu token, entre no servidor do discord e use o /token
            </p>
          </div>
          <div className="form__col">
            <form id="sign-image" onSubmit={handleFormSubmit}>
              <input type="text" name="name" placeholder="Seu nick" required />
              <input
                type="text"
                name="author"
                placeholder="Autor da Imagem"
                required
              />
              <input
                type="text"
                name="title"
                placeholder="Título da imagem"
                required
              />
              <input
                type="text"
                name="password"
                placeholder="Senha para apagar a imagem"
                required
              />
              <input
                type="text"
                name="token"
                placeholder="Insira aqui o seu token"
                required
              />
              <div className="form__image-input-wrapper">
                <label className="form__image-input-label">
                  <span className="form__image-input-text">
                    Selecione a sua imagem
                  </span>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                </label>
                <img className="file__thumbnail" />
              </div>
              <button type="submit" className="form__submit">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
