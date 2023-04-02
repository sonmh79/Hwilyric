import React, { useEffect, useState } from 'react'
import { IconImage, LyricListBody, LyricListBodyItem, LyricListBodyItemDiv, LyricThumbnail } from '../../styles/mypageStyle'
import { getLyricList } from '../../api/writingApi'
import { IGetILyricInfoTypes } from '../../types/mypageType'
import { lightDelete, lightModify, lightView } from '../../assets/mypage/myButtons'
import { deleteNote } from '../../api/deleteApit'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { userLyricsAtom } from '../../atoms/userAtom'

function MyPageLyricList() {
  const [myLyrics, setMyLyrics] = useState([])
  const [nullLyrics, setNullLyrics] = useState('')
  const [userLyrics, setUserLyrics] = useRecoilState(userLyricsAtom)
      
  async function getMyLyrics() {
    const lyricList = await getLyricList()
    if (lyricList !== null) {
      // sortByDate(lyricList)
      const sortedLyrics = lyricList.slice(0).sort((a: IGetILyricInfoTypes, b: IGetILyricInfoTypes) => {
        return new Date(b.updatedDate).valueOf() - new Date(a.updatedDate).valueOf();})
      console.log('소팅', sortedLyrics)
      setMyLyrics(sortedLyrics)
    } else {
      console.log('')
      setNullLyrics('새로운 곡을 작사해보세요')
    }
  }

  useEffect(() => {
    getMyLyrics()
  }, [])

  const onDeleteHandler = async (e: React.MouseEvent<HTMLImageElement>) => {
    if (window.confirm(`${e.currentTarget.alt}을(를) 삭제하시겠습니까?`)) {
      const noteId = e.currentTarget.id
      const res = await deleteNote(noteId)
      if (res !== null) {
        alert('삭제가 완료되었습니다')
        getMyLyrics()
      } else {
        alert('삭제가 실패했습니다. 다시 한 번 시도해주세요')
      }
    } else {
      return false
    }
  }

  return (
      <LyricListBody>
          {nullLyrics === '' ?
            <div>
            {myLyrics.map((myLyric:IGetILyricInfoTypes) => (
              <LyricListBodyItem key={myLyric.id}>
                <LyricListBodyItemDiv width='10vw'>
                  <LyricThumbnail src={myLyric.thumbnail} />
                </LyricListBodyItemDiv>
                <LyricListBodyItemDiv width='20vw'>
                  {myLyric.title}
                </LyricListBodyItemDiv>
                <LyricListBodyItemDiv width='10vw'>
                  {myLyric.createdDate.substring(0, 10)}
                </LyricListBodyItemDiv>
                <LyricListBodyItemDiv width='10vw'>
                  {myLyric.updatedDate.substring(0, 10)}
                </LyricListBodyItemDiv>
                <LyricListBodyItemDiv width='10vw'>
                  <IconImage src={lightView} id={myLyric.id} onClick={onDeleteHandler}/>
                  <IconImage src={lightModify} id={myLyric.id} onClick={onDeleteHandler}/>
                  <IconImage src={lightDelete} id={myLyric.id} alt={myLyric.title} onClick={onDeleteHandler}/>
                </LyricListBodyItemDiv>
              </LyricListBodyItem>
            ))}
            </div>
            : 
            <LyricListBodyItem>
              {nullLyrics}
            </LyricListBodyItem> }
      </LyricListBody>
  )
}

export default MyPageLyricList
