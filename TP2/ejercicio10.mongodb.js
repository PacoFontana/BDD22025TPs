use ("empresa")
db.createUser({
  user: "admin",
  pwd: "admin123",
  roles: [{ role: "readWrite"}]
})