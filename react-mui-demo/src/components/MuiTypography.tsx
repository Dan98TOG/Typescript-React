import{ Typography } from '@mui/material'

export const MuiTypography = () => {
  return (
    <div>
      <Typography variant='h1'>h1 Heading</Typography>
      <Typography variant='h2'>h2 Heading</Typography>
      <Typography variant='h3'>h3 Heading</Typography>
      <Typography variant='h4' component='h1' gutterBottom>h4 Heading</Typography>
      <Typography variant='h5'>h5 Heading</Typography>
      <Typography variant='h6'>h6 Heading</Typography>
      
      <Typography variant='subtitle1'>sub title 1</Typography>
      <Typography variant='subtitle2'>sub title2</Typography>
      
      <Typography >Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut recusandae aliquam pariatur quaerat explicabo eaque officia reprehenderit nulla animi, cupiditate quibusdam? Fugiat laudantium magnam temporibus natus? Et, harum. Repellat, architecto?</Typography>
      <Typography variant='body2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dicta, id enim veniam similique cumque. Suscipit facere labore sed saepe, nulla, numquam blanditiis quod quasi culpa pariatur veniam officiis laudantium?</Typography>
    </div>
  )
}