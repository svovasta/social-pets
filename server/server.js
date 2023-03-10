const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const userRouter = require('./routes/userRouter');
const postsRouter = require('./routes/postsRouter');
const myPostsRouter = require('./routes/myPostsRouter');
const apiRouter = require('./routes/apiRouter');
const discussionsRouter = require('./routes/discussionRouter');
const followersRouter = require('./routes/followersRouter');
const likesRouter = require('./routes/likesRouter');
const commentsRouter = require('./routes/commentsRouter');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    name: 'sid',
    secret: process.env.SESSION_SECRET ?? 'test',
    resave: true,
    store: new FileStore(),
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 12,
      httpOnly: true,
    },
  }),
);

app.use('/user', userRouter);
app.use('/posts', postsRouter);
app.use('/my-posts', myPostsRouter);
app.use('/api/v1', apiRouter);
app.use('/discussions', discussionsRouter);
app.use('/followers', followersRouter);
app.use('/likes', likesRouter);
app.use('/comments', commentsRouter);

app.listen(PORT, () => console.log(`Server has started on ${PORT}`));
