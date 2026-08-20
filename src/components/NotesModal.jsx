import { useState } from 'react';
import styled from 'styled-components';
import MacWindow from './MacWindow';
import notes from '../data/experience';

const NotesLayout = styled.div`
  display: flex;
  height: 500px;
`;

const Sidebar = styled.div`
  width: 220px;
  border-right: 1px solid #d5d5d5;
  background: #f0f0f0;
  overflow-y: auto;
  flex-shrink: 0;
`;

const NoteItem = styled.div`
  padding: 14px 16px;
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0;
  transition: background 0.15s;
  background: ${props => props.$active ? '#fef3c7' : 'transparent'};
  border-left: ${props => props.$active ? '3px solid #f59e0b' : '3px solid transparent'};
  &:hover {
    background: ${props => props.$active ? '#fef3c7' : '#e8e8e8'};
  }
`;

const NoteTitle = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 3px;
`;

const NoteMeta = styled.p`
  font-size: 12px;
  color: #999;
`;

const NotePreview = styled.span`
  color: #aaa;
  margin-left: 6px;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 30px;
  background: #fefefe;
`;

const DateHeader = styled.p`
  font-size: 12px;
  color: #999;
  text-align: center;
  margin-bottom: 20px;
`;

const ContentTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 24px;
`;

const ExperienceBlock = styled.div`
  margin-bottom: 28px;
`;

const RoleHeader = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

const CompanyLine = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

const BulletList = styled.ul`
  padding-left: 20px;
  margin-bottom: 8px;
`;

const BulletItem = styled.li`
  font-size: 14px;
  color: #444;
  line-height: 1.7;
  margin-bottom: 4px;
`;

const AboutText = styled.p`
  font-size: 15px;
  line-height: 1.8;
  color: #333;
  white-space: pre-line;
`;

export default function NotesModal({ onClose }) {
  const [activeNote, setActiveNote] = useState(notes[0].id);
  const currentNote = notes.find((n) => n.id === activeNote);

  const renderContent = () => {
    if (!currentNote) return null;
    if (currentNote.id === 'experience') {
      return (
        <>
          <ContentTitle>Experience</ContentTitle>
          {currentNote.content.map((exp, i) => (
            <ExperienceBlock key={i}>
              <RoleHeader>{exp.role}</RoleHeader>
              <CompanyLine>{exp.company} {exp.period}</CompanyLine>
              <BulletList>
                {exp.bullets.map((b, j) => (
                  <BulletItem key={j}>{b}</BulletItem>
                ))}
              </BulletList>
            </ExperienceBlock>
          ))}
        </>
      );
    }
    return (
      <>
        <ContentTitle>About</ContentTitle>
        <AboutText>{currentNote.content}</AboutText>
      </>
    );
  };

  return (
    <MacWindow title="Notes" width="750px" onClose={onClose}>
      <NotesLayout>
        <Sidebar>
          {notes.map((note) => (
            <NoteItem
              key={note.id}
              $active={activeNote === note.id}
              onClick={() => setActiveNote(note.id)}
            >
              <NoteTitle>{note.title}</NoteTitle>
              <NoteMeta>
                {note.date}
                <NotePreview>{note.preview}</NotePreview>
              </NoteMeta>
            </NoteItem>
          ))}
        </Sidebar>
        <ContentArea>
          <DateHeader>{currentNote?.fullDate}</DateHeader>
          {renderContent()}
        </ContentArea>
      </NotesLayout>
    </MacWindow>
  );
}