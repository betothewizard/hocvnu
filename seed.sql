-- Seed data
DELETE FROM submissions;
DELETE FROM questions;

INSERT INTO questions (id, question, options, created_at)
VALUES
('q1', 'What is the capital of France?', '["Berlin", "Paris", "London", "Madrid"]', unixepoch()),
('q2', 'Which planet is known as the Red Planet?', '["Earth", "Mars", "Venus", "Jupiter"]', unixepoch()),
('q3', 'What is the largest ocean on Earth?', '["Atlantic", "Indian", "Arctic", "Pacific"]', unixepoch()),
('q4', 'Which element has the chemical symbol Au?', '["Silver", "Gold", "Aluminum", "Argon"]', unixepoch()),
('q5', 'Who wrote "Romeo and Juliet"?', '["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"]', unixepoch()),
('q6', 'What is the tallest mountain in the world?', '["K2", "Mount Kilimanjaro", "Mount Everest", "Mount Fuji"]', unixepoch()),
('q7', 'Which is not a primary color?', '["Red", "Blue", "Green", "Yellow"]', unixepoch()),
('q8', 'What year did the Titanic sink?', '["1905", "1912", "1920", "1931"]', unixepoch()),
('q9', 'Which animal is known as the "King of the Jungle"?', '["Tiger", "Lion", "Elephant", "Gorilla"]', unixepoch()),
('q10', 'What is the smallest prime number?', '["0", "1", "2", "3"]', unixepoch()),
('q11', 'Which planet has the most moons?', '["Jupiter", "Saturn", "Uranus", "Neptune"]', unixepoch()),
('q12', 'Who painted the Mona Lisa?', '["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"]', unixepoch());

INSERT INTO submissions (question_id, answer_index, count)
VALUES
('q1', 0, 12),
('q1', 1, 78),
('q1', 2, 5),
('q1', 3, 3),

('q2', 0, 3),
('q2', 1, 85),
('q2', 2, 4),
('q2', 3, 2),

('q3', 0, 25),
('q3', 1, 10),
('q3', 2, 5),
('q3', 3, 65),

('q4', 1, 45),
('q5', 1, 65),
('q6', 2, 70),
('q7', 3, 55),
('q8', 1, 60),
('q9', 1, 75),
('q10', 2, 50);
