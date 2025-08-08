import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2C3E50',
        },
        secondary: {
            main: '#E74C3C',
        },
        background: {
            default: '#F5F5F5',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#34495E',
            secondary: '#7F8C8D',
        },
    },
    typography: {
        fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
        h2: {
            fontFamily: '"Lora", "serif"',
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#2C3E50',
            marginBottom: '1.5rem',
        },
        h5: {
            fontFamily: '"Lora", "serif"',
            fontSize: '1.6rem',
            fontWeight: 500,
            marginBottom: '0.5rem',
            color: '#34495E',
        },
        body1: {
            lineHeight: 1.6,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    padding: '10px 20px',
                },
                containedPrimary: {
                    '&:hover': {
                        backgroundColor: '#34495E',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2C3E50',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2C3E50',
                        },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#2C3E50',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 28px rgba(0,0,0,0.1)',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF',
                    color: '#2C3E50',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#E74C3C',
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline',
                    }
                }
            }
        }
    },
});

export default theme;