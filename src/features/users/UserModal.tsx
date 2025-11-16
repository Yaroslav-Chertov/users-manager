import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, editUser } from "./usersSlice";
import type { AppDispatch } from "../../app/store";

export default function UserModal({
  onClose,
  editing,
}: {
  onClose: () => void;
  editing: any;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (editing)
      setForm({
        name: editing.name,
        email: editing.email,
        phone: editing.phone || "",
      });
  }, [editing]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await dispatch(editUser({ id: editing.id, user: form })).unwrap();
      } else {
        await dispatch(addUser(form)).unwrap();
      }
      onClose();
    } catch (err) {
      alert("Ошибка сохранения: " + (err as any).message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Обёртка для формы и крестика */}
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        {/* Крестик закрытия */}
        <button type="button" className="modal-close" onClick={onClose}>
          ×
        </button>

        {/* Форма */}
        <form onSubmit={submit} className="modal">
          <h3>{editing ? "Редактирование" : "Создать пользователя"}</h3>

          <div>
            <label>Имя</label>
            <br />
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label>Email</label>
            <br />
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              required
            />
          </div>

          <div>
            <label>Телефон</label>
            <br />
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div style={{ marginTop: 12 }}>
            <button className="submint-modal" type="submit">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
