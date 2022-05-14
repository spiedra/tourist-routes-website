import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router'

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Autocomplete,
  TextField,
  Chip
} from '@mui/material'

import { getTouristRoutesData } from '../../services'

const keyWords = [
  { key: 0, class: 'Playa' },
  { key: 1, class: 'Montaña' },
  { key: 2, class: 'Familia' },
  { key: 3, class: 'Fiesta' },
  { key: 5, class: 'Trabajo' }
]

const TouristRoutes = () => {
  const [data, setData] = useState()
  const [touristRoutesData, setTouristRoutesData] = useState()
  const navigate = useNavigate()
  const [chipData, setChipData] = useState([])

  useEffect(() => {
    getTouristRoutesData().then((response) => {
      setData(response)
      setTouristRoutesData(response)
    })
  }, [])

  const handleOnClick = (param) => {
    navigate(`/tourist-routes/${param}`)
  }

  return (
    <>
      <Box
        sx={{
          px: '1rem',
          pt: '.8rem'
        }}
      >
        <h1>Rutas Turísticas</h1>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Autocomplete
            multiple
            id="fixed-tags-demo"
            value={chipData}
            onChange={(event, newValue) => {
              setChipData([...newValue])
              setData([...touristRoutesData.filter((x) => {
                for (const iterator of newValue) {
                  if (!(iterator.class in x.keyWords)) {
                    return false
                  }
                }
                return true
              })])
            }}
            options={keyWords}
            getOptionLabel={(option) => option.class}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  key={option.key}
                  label={option.class}
                  {...getTagProps({ index })}
                />
              ))
            }
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Categoría" />
            )}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '40px',
            justifyContent: 'center',
            mt: '2rem'
          }}
        >
          {data
            ? data.map((item) => (
                <Card
                  key={item.name}
                  sx={{ maxWidth: 345 }}
                  onClick={() => handleOnClick(item.name)}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.images[0]}
                      alt={`Imagen de ${item.name}`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
            ))
            : 'Cargando'}
        </Box>
      </Box>
    </>
  )
}

export default TouristRoutes
