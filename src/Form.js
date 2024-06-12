function Form({ button, eventInput, register, obj, clear, remove, update }) {
  return (
    <form>
      <input
        type="text"
        value={obj.name}
        onChange={eventInput}
        name="name"
        placeholder="Nome"
        className="form-control"
      />
      <input
        type="text"
        onChange={eventInput}
        value={obj.brand}
        name="brand"
        placeholder="Marca"
        className="form-control"
      />
      {button ? (
        <input
          type="button"
          value="Cadastrar"
          className="btn btn-primary"
          onClick={register}
        />
      ) : (
        <div>
          <input
            type="button"
            value="Alterar"
            onClick={update}
            className="btn btn-warning"
          />
          <input
            type="button"
            value="Remover"
            className="btn btn-danger"
            onClick={remove}
          />
          <input
            type="button"
            value="Cancelar"
            className="btn btn-secondary"
            onClick={clear}
          />
        </div>
      )}
    </form>
  );
}

export default Form;
