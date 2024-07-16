'use client'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';


// ----------------------------------------------------------------------

export default function LoadingPage() {

  return (
    <>
      <Container>
        <Box
          sx={{
            py: 12,
            maxWidth: 480,
            mx: 'auto',
            display: 'flex',
            minHeight: '100vh',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            Loading ...
          </Typography>

          <Box sx={{ width: '100%'}}>
            <LinearProgress />
          </Box>
        </Box>
      </Container>
    </>
  );
}
