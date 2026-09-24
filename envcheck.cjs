const out = {
  DB_PORT: process.env.DB_PORT,
  DB_DATABASE: process.env.DB_DATABASE,
};
try {
  require.resolve('dotenv');
  out.dotenvResolvable = true;
} catch {
  out.dotenvResolvable = false;
}
console.log(JSON.stringify(out));
