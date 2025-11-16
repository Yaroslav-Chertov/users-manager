import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, setPage } from "./usersSlice";
import type { RootState, AppDispatch } from "../../app/store";
import UserModal from "./UserModal.tsx";
import { Link } from "react-router-dom";

export default function UsersList() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error, page, limit } = useSelector(
    (s: RootState) => s.users
  );

  const [isOpen, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  useEffect(() => {
    dispatch(loadUsers({ page, limit }));
  }, [dispatch, page, limit]);

  return (
    <div className="page-container">
      <h2>Пользователи</h2>

      <button
        onClick={() => {
          setEditing(null);
          setOpen(true);
        }}
      >
        Создать
      </button>

      {error && <div className="error-text">{error}</div>}

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Email</th>
              <th>Телефон</th>
              <th>Детали</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(list) &&
              list.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>
                    <Link to={`/user/${u.id}`}>Открыть</Link>{" "}
                    <button
                      onClick={() => {
                        setEditing(u);
                        setOpen(true);
                      }}
                    >
                      Редактировать
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      <div className="pagination">
        <button
          disabled={page <= 1}
          onClick={() => dispatch(setPage(page - 1))}
        >
          ◀ Prev
        </button>

        <span>Стр. {page}</span>

        <button onClick={() => dispatch(setPage(page + 1))}>Next ▶</button>
      </div>

      {isOpen && <UserModal onClose={() => setOpen(false)} editing={editing} />}
    </div>
  );
}
