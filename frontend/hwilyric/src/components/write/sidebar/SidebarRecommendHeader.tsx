import React, { useState } from 'react'
import { ButtonBox, RecommendButton, RecommendHeader, RecommendSelectButton, SearchButton, SearchboxForm, SearchboxInput } from '../../../styles/recommendStyle'
import { IconImage } from '../../../styles/mypageStyle'
import { SearchIcon } from '../../../assets/writeSideBar/writeImg'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { getErrorMessageAtom, keywordListAtom, keywordModeAtom } from '../../../atoms/sidebarAtoms'
import { rhymeKeyword, similarKeyword } from '../../../api/writingApi'
import { isLoadingState } from '../../../atoms/sidebarAtoms'

function SidebarRecommendHeader() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [keywordMode, setKeywordMode] = useRecoilState(keywordModeAtom)
  const setWordList = useSetRecoilState(keywordListAtom)
  const setErrorMessage = useSetRecoilState(getErrorMessageAtom)

  const setIsLoading = useSetRecoilState(isLoadingState)

  async function getSimilar(searchWord:string) {
    const newWordList = await similarKeyword(searchWord)
    if (newWordList !== null) {
      await setIsLoading(false)
      setWordList(newWordList)
      setErrorMessage('')
    } else {
      setIsLoading(false)
      setErrorMessage('연관 키워드를 찾지 못했습니다')
    }
  }

  async function getRhyme(searchWord:string) {
    const newWordList = await rhymeKeyword(searchWord)
    if (newWordList !== null) {
      await setIsLoading(false)
      setWordList(newWordList)
      setErrorMessage('')
    } else {
      setIsLoading(false)
      setErrorMessage('라임 키워드를 찾지 못했습니다')
    }
  }

  const onSearchwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputWord = e.currentTarget.value;
    setSearchKeyword(inputWord)
  }

  const onSearchHandler = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    if (keywordMode === 'similar') {
      getSimilar(searchKeyword)
    } else {
      getRhyme(searchKeyword)
    }
  }

  const onModeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const recommendMode = e.currentTarget.value
    setKeywordMode(recommendMode);
    setErrorMessage('키워드를 검색해주세요')
  };
  
  return (
    <RecommendHeader>
      <ButtonBox>
        { (keywordMode === 'similar') ? (
          <RecommendButton type='button' value='rhyme' onClick={onModeHandler}>라임</RecommendButton>
          ) : (
            <RecommendSelectButton type='button' value='rhyme' onClick={onModeHandler}>라임</RecommendSelectButton>
          )
        }
        { (keywordMode === 'similar') ? (
        <RecommendSelectButton type='button' value='similar' onClick={onModeHandler}>연관</RecommendSelectButton>
        ) : (
          <RecommendButton type='button' value='similar' onClick={onModeHandler}>연관</RecommendButton>
        )
      }
      </ButtonBox>
      <SearchboxForm onSubmit={onSearchHandler}>
          <SearchboxInput type="text" placeholder='검색어를 입력하세요' onChange={onSearchwordHandler}/>
          <SearchButton type='submit'>
            <IconImage src={SearchIcon} />
          </SearchButton>
      </SearchboxForm>
    </RecommendHeader>
  )
}

export default SidebarRecommendHeader
