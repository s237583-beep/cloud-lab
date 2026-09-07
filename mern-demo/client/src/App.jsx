import { useState, useEffect } from 'react';
const API_URL = 'http://localhost:5000/api/students';

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editStudentId, setEditStudentId] = useState('');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const fetchStudents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error('Lỗi khi tải danh sách:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, name, email })
      });
      setStudentId('');
      setName('');
      setEmail('');
      fetchStudents();
    } catch (err) {
      console.error('Lỗi khi thêm sinh viên:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchStudents();
    } catch (err) {
      console.error('Lỗi khi xóa sinh viên:', err);
    }
  };

  const handleEditClick = (st) => {
    setEditingId(st._id);
    setEditStudentId(st.studentId);
    setEditName(st.name);
    setEditEmail(st.email);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditStudentId('');
    setEditName('');
    setEditEmail('');
  };

  const handleUpdate = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: editStudentId, name: editName, email: editEmail })
      });
      handleCancelEdit();
      fetchStudents();
    } catch (err) {
      console.error('Lỗi khi cập nhật sinh viên:', err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Quản lý Sinh viên</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="MSSV"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
          style={{ marginRight: '8px', padding: '6px' }}
        />
        <input
          type="text"
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginRight: '8px', padding: '6px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginRight: '8px', padding: '6px' }}
        />
        <button type="submit" style={{ padding: '6px 12px' }}>Thêm Sinh viên</button>
      </form>
      <h3>Danh sách Sinh viên</h3>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((st) => (
            <tr key={st._id}>
              {editingId === st._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editStudentId}
                      onChange={(e) => setEditStudentId(e.target.value)}
                      style={{ padding: '4px', width: '80px' }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      style={{ padding: '4px', width: '120px' }}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      style={{ padding: '4px', width: '150px' }}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleUpdate(st._id)} style={{ marginRight: '6px' }}>Lưu</button>
                    <button onClick={handleCancelEdit}>Hủy</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{st.studentId}</td>
                  <td>{st.name}</td>
                  <td>{st.email}</td>
                  <td>
                    <button onClick={() => handleEditClick(st)} style={{ marginRight: '6px' }}>Sửa</button>
                    <button onClick={() => handleDelete(st._id)}>Xóa</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
