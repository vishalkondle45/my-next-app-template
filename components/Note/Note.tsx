import { Paper, rem, Text } from '@mantine/core';
import { NoteDocument } from '@/models/Note';

interface Props {
  note: NoteDocument;
  handleClick: (note: NoteDocument) => void;
}

const Note = ({ note, handleClick }: Props) => (
  <Paper
    shadow="sm"
    p="md"
    radius="md"
    withBorder
    bg={`${note.color}.3`}
    onClick={() => handleClick(note)}
    mih={rem(120)}
    // mah={rem(32 * note.note.split('\n').length)}
  >
    <Text size="md" fw={500} dangerouslySetInnerHTML={{ __html: note.title }} />
    <Text size="sm" dangerouslySetInnerHTML={{ __html: note.note.replace(/\r?\n/g, '<br />') }} />
  </Paper>
);

export default Note;