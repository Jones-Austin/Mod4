require('dotenv').config();
const { Pool } = require('pg');
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function seedDatabase() {
    try {
        

        // Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS books (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author VARCHAR(255) NOT NULL,
                genre VARCHAR(100),
                publication_year INTEGER,
                isbn VARCHAR(20)
            );
        `);

        // Insert data
        const booksData = [
          { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', genre: 'Fantasy', publication_year: 1954, isbn: '978-0618640157' },
          { title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', publication_year: 1813, isbn: '978-0141439518' },
          { title: '1984', author: 'George Orwell', genre: 'Dystopian', publication_year: 1949, isbn: '978-0451524935' },
          { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', publication_year: 1960, isbn: '978-0446310789' },
          { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', publication_year: 1925, isbn: '978-0743273565' },
          { title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', genre: 'Magical Realism', publication_year: 1967, isbn: '978-0060883287' },
          { title: 'Brave New World', author: 'Aldous Huxley', genre: 'Dystopian', publication_year: 1932, isbn: '978-0060850524' },
          { title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction', publication_year: 1951, isbn: '978-0316769488' },
          { title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', publication_year: 1937, isbn: '978-0547928227' },
          { title: 'Fahrenheit 451', author: 'Ray Bradbury', genre: 'Dystopian', publication_year: 1953, isbn: '978-1451673319' },
          { title: 'Jane Eyre', author: 'Charlotte Brontë', genre: 'Gothic Romance', publication_year: 1847, isbn: '978-0141441146' },
          { title: 'The Odyssey', author: 'Homer', genre: 'Epic Poetry', publication_year: -800, isbn: '978-0143039952' },
          { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', genre: 'Psychological Fiction', publication_year: 1866, isbn: '978-0140449136' },
          { title: 'Wuthering Heights', author: 'Emily Brontë', genre: 'Gothic Romance', publication_year: 1847, isbn: '978-0141439556' },
          { title: 'Moby Dick', author: 'Herman Melville', genre: 'Adventure', publication_year: 1851, isbn: '978-0142437247' },
          { title: 'The Divine Comedy', author: 'Dante Alighieri', genre: 'Epic Poetry', publication_year: 1320, isbn: '978-0140444438' },
          { title: 'Hamlet', author: 'William Shakespeare', genre: 'Tragedy', publication_year: 1603, isbn: '978-0743477123' },
          { title: 'Don Quixote', author: 'Miguel de Cervantes', genre: 'Satire', publication_year: 1605, isbn: '978-0060934347' },
          { title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', genre: 'Childrens', publication_year: 1943, isbn: '978-0156012195' },
          { title: 'And Then There Were None', author: 'Agatha Christie', genre: 'Mystery', publication_year: 1939, isbn: '978-0062073488' }
        ];

        for (const book of booksData) {
            await pool.query(
                'INSERT INTO books (title, author, genre, publication_year, isbn) VALUES ($1, $2, $3, $4, $5)',
                [book.title, book.author, book.genre, book.publication_year, book.isbn]
            );
        }

        console.log('Database seeded successfully!');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        
        pool.end();
    }
}

seedDatabase();

// Script action bro. 