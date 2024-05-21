import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Machines from '@/app/components/machines'

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
          marginY: 4
        }}>
        <Typography variant="h4" component="h1">
          ZEISS - Machine Assets
        </Typography>
        <Machines />
      </Box>
    </Container>
  );
}
