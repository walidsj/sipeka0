const password = Bun.password.hashSync("admin", "bcrypt");

console.log("Password Hash:", password);
