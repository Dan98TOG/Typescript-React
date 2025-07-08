import { Stack, Button, IconButton, ButtonGroup, ToggleButton, ToggleButtonGroup} from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import React, { useState } from "react";

export const MuiButton = () => {
  const [formats, setFormats] = useState<string | null>(null)
  console.log(formats,)
  const handleFormatChange = (_event: React.MouseEvent<HTMLElement>, updatedFormats: string | null) => {
    setFormats(updatedFormats)
  }
  return (
    <Stack spacing={4}>
      <Stack spacing={2} direction={'row'}>
        <Button variant="text" href="https://google.com">Text</Button>
        <Button variant="contained">contained</Button>
        <Button variant="outlined">outlined</Button>
      </Stack>

      <Stack spacing={2} direction={'row'}>
        <Button variant="text" color="primary">Primary</Button>
        <Button variant="text" color="secondary">secondary</Button>
        <Button variant="text" color="error">error</Button>
        <Button variant="text" color="warning">warning</Button>
        <Button variant="text" color="info">info</Button>
        <Button variant="text" color="success">success</Button>
      </Stack>

      <Stack spacing={2} direction={'row'}>
        <Button variant="contained" color="primary">Primary</Button>
        <Button variant="contained" color="secondary">secondary</Button>
        <Button variant="contained" color="error">error</Button>
        <Button variant="contained" color="warning">warning</Button>
        <Button variant="contained" color="info">info</Button>
        <Button variant="contained" color="success">success</Button>
      </Stack>

      <Stack spacing={2} direction={'row'}>
        <Button variant="outlined" color="primary">Primary</Button>
        <Button variant="outlined" color="secondary">secondary</Button>
        <Button variant="outlined" color="error">error</Button>
        <Button variant="outlined" color="warning">warning</Button>
        <Button variant="outlined" color="info">info</Button>
        <Button variant="outlined" color="success">success</Button>
      </Stack>

      <Stack display={'block'} spacing={2} direction={'row'}>
        <Button variant="contained" size="small">small</Button>
        <Button variant="contained" size="medium">medium</Button>
        <Button variant="contained" size="large">large</Button>
      </Stack>

      <Stack spacing={2} direction={'row'}>
        <Button variant="contained" startIcon={<SendIcon />} disableRipple onClick={() => alert('Clicked')}>Send</Button>
        <Button variant="contained" endIcon={<SendIcon />} disableElevation>Send</Button>
        <IconButton aria-label="send" color="success" size="small"><SendIcon /></IconButton>
      </Stack>
      <Stack direction={'row'} >
        <ButtonGroup variant="text">
        <Button>left</Button>
        <Button>center</Button>
        <Button>right</Button>
        </ButtonGroup>
        <ButtonGroup variant="contained" orientation="vertical" size="small" color="secondary" aria-label="alignment button group">
        <Button onClick={() => alert('Left Click')}>left</Button>
        <Button>center</Button>
        <Button>right</Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined">
        <Button>left</Button>
        <Button>center</Button>
        <Button>right</Button>
        </ButtonGroup>
      </Stack>
      <Stack direction={'row'}>
           <ToggleButtonGroup 
          aria-label="text formatting" 
          value={formats} 
          onChange = {handleFormatChange}
          size="small"
          color="success"
          orientation="vertical"
          exclusive
        >
          <ToggleButton value={'bold'} aria-label="bold"><FormatBoldIcon /></ToggleButton>
            <ToggleButton value={'italic'} aria-label="italic"><FormatItalicIcon /></ToggleButton>
            <ToggleButton value={'underlined'} aria-label="underlined"><FormatUnderlinedIcon /></ToggleButton>
          </ToggleButtonGroup>
      </Stack>
    </Stack>
  )
}
