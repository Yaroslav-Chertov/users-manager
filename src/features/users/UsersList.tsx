import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, setPage } from "./usersSlice";
import type { RootState, AppDispatch } from "../../app/store";
import UserModal from "./UserModal.tsx";
import { useNavigate } from "react-router-dom";

export default function UsersList() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    list,
    loading,
    error,
    page,
    limit = 5,
    total = 0,
  } = useSelector((s: RootState) => s.users);

  // Безопасный расчёт последней страницы
  const lastPage = Math.max(Math.ceil(total / limit), 1);

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
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(list) &&
              list.map((u) => (
                <tr
                  key={u.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/user/${u.id}`)}
                >
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>
                    <button
                      className="button-edit"
                      onClick={(e) => {
                        e.stopPropagation();
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

        <button
          disabled={page >= lastPage || total === 0}
          onClick={() => dispatch(setPage(page + 1))}
        >
          Next ▶
        </button>
      </div>

      {isOpen && <UserModal onClose={() => setOpen(false)} editing={editing} />}
    </div>
  );
}
