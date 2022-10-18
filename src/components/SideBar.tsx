import { GenreResponseProps } from "./Content";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import "../styles/sidebar.scss";

interface SideBarProps {
  clickButtonCallback: (id: number) => void;
  selectedGenreId: number;
}

export function SideBar({
  clickButtonCallback,
  selectedGenreId,
}: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  function handleSelectGenre(id: number) {
    clickButtonCallback(id);
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleSelectGenre(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
