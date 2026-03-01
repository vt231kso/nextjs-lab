import { Post } from '@/types/post';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  CardActions
} from '@mui/material';

async function getFavoritePost(id: number): Promise<Post> {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 3000)
  );

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  return response.json();
}

export async function FavoriteArticle({ id }: { id: number }) {
  const post = await getFavoritePost(id);

  return (
    <Card
      sx={{
        borderRadius: 4,
        transition: 'all 0.3s ease',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardContent>
        <Chip
          label={`Post #${post.id}`}
          color="secondary"
          size="small"
          sx={{ mb: 2 }}
        />

        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          sx={{ textTransform: 'capitalize' }}
        >
          {post.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button variant="contained" color="primary" fullWidth>
          Переглянути
        </Button>
      </CardActions>
    </Card>
  );
}
