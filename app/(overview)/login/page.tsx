"use client";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub'; // Додай цей рядок до інших імпортів
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Alert,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Невірний email або пароль. Спробуйте ще раз.");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            borderRadius: 2,
          }}
        >
          {/* Іконка замка зверху */}
          <Box sx={{ m: 1, bgcolor: "primary.main", p: 1, borderRadius: "50%", color: "white" }}>
            <LockOutlined />
          </Box>

          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Вхід у систему
          </Typography>

          {/* Повідомлення про помилку */}
          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email адреса"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.5, fontSize: "1rem", fontWeight: "bold" }}
            >
              {loading ? "Вхід..." : "Увійти"}
            </Button>
            <Typography sx={{ my: 2, textAlign: 'center', color: 'text.secondary' }}>або</Typography>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => signIn("google", { callbackUrl: "/" })} // Викликаємо вхід через Google
              sx={{ py: 1.5 }}
            >
              Увійти через Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="inherit" // GitHub часто роблять чорним або нейтральним
              startIcon={<GitHubIcon />}
              onClick={() => signIn("github", { callbackUrl: "/" })} // Додаємо callbackUrl для впевненості
              sx={{
                py: 1.5,
                borderColor: 'divider',
                '&:hover': { backgroundColor: 'action.hover' }
              }}
            >
              Увійти через GitHub
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
