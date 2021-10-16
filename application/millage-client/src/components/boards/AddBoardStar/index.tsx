import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {useEffect, useState} from 'react';
import {useBoard} from '@hooks/board';
import {StarIcon as OutlinedStarIcon} from '@images';
import StarIcon from '@mui/icons-material/Star';
import {Board} from '@modules/board/types';
import './addboardstar.css';
import {toggleBoardStarAsync} from '@modules/board/actions';
import {useDispatch} from 'react-redux';
type Props = {
  open: boolean;
  closeHandler: () => void;
};
const AddBoardStar :React.FC<Props> = ({closeHandler, open}) => {
  const dispatch = useDispatch();
  const {
    boardListState,
    starBoardState,
  } = useBoard();
  const [keyword, setKeyword] = useState('');
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    if (boardListState.data) {
      setBoards(boardListState.data);
    }
  }, [boardListState.data]);

  useEffect(() => {
    if (keyword === '' && boardListState.data) {
      setBoards(boardListState.data);
    } else if (boardListState.data) {
      setBoards(boardListState.data.filter((board: any) => {
        return board.title.includes(keyword);
      }));
    }
  }, [keyword]);

  const renderBoards = () => {
    return boards.map((b: Board, idx: number) => {
      return (
        <div key={idx} className="flex">
          <button className="boardButton flex flex-col justify-center"
            onClick={() => {
              dispatch(toggleBoardStarAsync.request(b.id));
            }}>
            { b.isStarred?
              <StarIcon/>:
              <img src={OutlinedStarIcon} />
            }
          </button>
          <span className="flex flex-col justify-center">{b.title}</span>
        </div>
      );
    });
  };

  return (
    <Dialog id="AddBoardDialog" onClose={closeHandler}
      open={open}
    >
      <div className="AddBoardContainer"
        style={
          starBoardState.loading?
          {
            background: 'rgba(0,0,0,0.2)',
            pointerEvents: 'none',
          }:
          {}
        }
      >
        <IconButton
          aria-label="close"
          onClick={closeHandler}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle className="dialogTitle">
            게시판 즐겨찾기
        </DialogTitle>
        <DialogContent>
          <div id="SearchContainer">
            <input type="text"
              placeholder="게시판 검색"
              value={keyword}
              style={
                starBoardState.loading?
                {
                  background: 'rgba(0,0,0,0.2)',
                  pointerEvents: 'none',
                }:
                {}
              }
              onChange={(e) => {
                setKeyword(e.target.value);
              }} />
          </div>
          <div id="BoardsContainer">
            {renderBoards()}
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default AddBoardStar;
