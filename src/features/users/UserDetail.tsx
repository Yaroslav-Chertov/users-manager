import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./usersSlice";
import type { AppDispatch, RootState } from "../../app/store";

export default function UserDetail() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const selected = useSelector((s: RootState) => s.users.selected);

  useEffect(() => {
    if (id) dispatch(loadUser(id));
  }, [dispatch, id]);

  if (!selected) return <div>Загрузка...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{selected.name}</h2>
      <p>
        <b>Email:</b> {selected.email}
      </p>
      <p>
        <b>Телефон:</b> {selected.phone}
      </p>
      <p>
        <b>Создан:</b> {selected.createdAt}
      </p>
      <Link to="/">Назад</Link>
    </div>
  );
}
