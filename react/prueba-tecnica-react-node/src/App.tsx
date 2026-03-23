import { useState } from "react";
import "./App.css";

type IdElement = string;

interface ElementType {
  title: string;
  id: IdElement;
}

interface ListProps {
  elements: ElementType[];
  handleDelete: (id: IdElement) => void;
}

interface ListItemProps {
  element: ElementType;
  handleDelete: (id: IdElement) => void;
}

function List({ elements, handleDelete }: ListProps) {
  return (
    <ul>
      {elements.map((element) => (
        <ListItem
          key={element.id}
          element={element}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

function ListItem({ element, handleDelete }: ListItemProps) {
  return (
    <li onClick={() => handleDelete(element.id)} style={{ cursor: "pointer" }}>
      {element.title}
    </li>
  );
}

function App() {
  const [elements, setElements] = useState<ElementType[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const nameElement = data.get("element-input-name");

    if (typeof nameElement === "string") {
      const trimmedName = nameElement.trim();

      if (!trimmedName) return;

      const newElement: ElementType = {
        id: crypto.randomUUID(),
        title: trimmedName,
      };

      setElements((prev) => [...prev, newElement]);
      form.reset();
    }
  };

  const handleDelete = (id: IdElement) => {
    setElements((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="element-input-name">New element</label>
        <input
          id="element-input-name"
          name="element-input-name"
          type="text"
          required
          placeholder="New element..."
        />
        <button type="submit">Add Element</button>
      </form>

      <section>
        <h2>List of Elements:</h2>
        {elements.length === 0 ? (
          <p>The List of Elements is empty</p>
        ) : (
          <List elements={elements} handleDelete={handleDelete} />
        )}
      </section>
    </>
  );
}

export default App;
