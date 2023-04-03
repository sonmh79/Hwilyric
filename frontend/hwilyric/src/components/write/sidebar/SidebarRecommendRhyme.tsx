import React from 'react'
import { RandomHeader, RecommendBody, WordContainer, WordItem } from '../../../styles/recommendStyle'
import { useRecoilValue } from 'recoil'
import { keywordListAtom } from '../../../atoms/sidebarAtoms'

function SidebarRecommendRhyme() {
  const wordList = useRecoilValue(keywordListAtom)
  return (
    <RecommendBody>
      <RandomHeader>
        <span>라임 키워드</span>
      </RandomHeader>
      <WordContainer>
        {wordList.map((word:string) => (
          <WordItem>{word}</WordItem>
        ))}
      </WordContainer>
    </RecommendBody>
  )
}

export default SidebarRecommendRhyme