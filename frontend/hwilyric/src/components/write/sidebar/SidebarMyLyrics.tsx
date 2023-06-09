import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IGetILyricInfoTypes } from '../../../types/mypageType'
import { ILyricBlockTypes } from '../../../types/writingType'
import { LyricListBodyItem, LyricListBodyItemDiv, LyricText } from '../../../styles/mypageStyle'
import { useRecoilValue } from 'recoil'
import { getLyricList } from '../../../api/writingApi'
import { IsLoginAtom } from '../../../atoms/userAtom'
import { MyLyricBody, MyLyricListBodyItemContent, MyLyricThumbnail, MyLyricListBodyDiv, MyLyricSubBody } from '../../../styles/MyLyricStyle'
import { sidebarCategoryAtom } from '../../../atoms/sidebarAtoms'
import SidebarMyLyricsSelect from './SidebarMyLyricsSelect'
import { LoginRecButton, NotLoggedInDiv } from '../../../styles/recommendStyle'

function SidebarMyLyrics() {
  const [myLyrics, setMyLyrics] = useState([])
  const [nullLyrics, setNullLyrics] = useState('')
  const isLogin = useRecoilValue(IsLoginAtom)

  const currentCategory = useRecoilValue(sidebarCategoryAtom)

  async function getMyLyrics() {
    const lyricList = await getLyricList()
    if (lyricList !== null) {
      const sortedLyrics = lyricList.slice(0).sort((a: IGetILyricInfoTypes, b: IGetILyricInfoTypes) => {
        return new Date(b.updatedDate).valueOf() - new Date(a.updatedDate).valueOf();})
        setMyLyrics(sortedLyrics)
    } else {
      setNullLyrics('해당 카테고리의 가사가 없습니다')
    }
  }

  useEffect(() => {
    if (isLogin) {
    getMyLyrics()
    }
  }, [currentCategory])
  
  return (
    <MyLyricBody>
      {isLogin ? (
      <MyLyricSubBody>
      <SidebarMyLyricsSelect />
      <MyLyricListBodyDiv>
        {nullLyrics === '' ?
          <div>
            {myLyrics.map((myLyric:IGetILyricInfoTypes) => (
              myLyric.lyricList.map((lyricCtgr: ILyricBlockTypes) => {
                if (lyricCtgr.type === currentCategory) {
                  return (
                    <LyricListBodyItem key={myLyric.id}>
                      <LyricListBodyItemDiv width='80px' style={{height: "80px"}}>
                        <MyLyricThumbnail src={myLyric.thumbnail} />
                      </LyricListBodyItemDiv>
                      <MyLyricListBodyItemContent>                                 
                        <LyricText width='80%'>
                          <span>{myLyric.title}</span>
                        </LyricText>                                 
                        <LyricText width='90%'>
                          <span>{lyricCtgr.lyrics}</span>
                        </LyricText>
                      </MyLyricListBodyItemContent>
                    </LyricListBodyItem>
                  )
                }
              })
            ))}
          </div>
          : <LyricListBodyItem>
            {nullLyrics}
          </LyricListBodyItem>
        }
      </MyLyricListBodyDiv>
    </MyLyricSubBody> ) : (
      <NotLoggedInDiv>
        <p>로그인 하지 않으면 가사를 저장할 수 없어요</p>
        <br/>
        <p>로그인 후 더 많은 기능을 이용해보세요!</p>
        <Link to="/login">
          <LoginRecButton>지금 쓴 가사 저장하러 가기</LoginRecButton>
        </Link>
      </NotLoggedInDiv>)
    }
    </MyLyricBody>
  )
}

export default SidebarMyLyrics