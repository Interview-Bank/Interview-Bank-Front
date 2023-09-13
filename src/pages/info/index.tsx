import { SeoHead } from '@/components/atoms';
import { Banner } from '@/components/molecules';
import React from 'react'

type Props = {}

const InfoPage = (props: Props) => {
  return (
    <section className='info'>
      <SeoHead title='인터뷰 뱅크' />
      <Banner />
      <div className='info__content'>
        <h1>인터뷰뱅크 소개</h1>
        <div>
          <p>
            <strong>인터뷰 뱅크(Interview Bank)</strong>는 면접 질문 아카이브 플랫폼입니다.<br />
            인터뷰 후에 면접 기록을 남기고, 과거의 면접 경험을 돌아보실 수 있습니다. 나아가, 질문에 대한 Chat GPT의 답변을 즉시 확인할 수 있습니다.<br/>
            취업을 준비하는 모든 분들께 가장 효율적이고 편리한 정보 습득과 실전 준비를 도와드리고자 합니다.
          </p>

          <p>
            이 프로젝트는 2명의 백엔드 개발자, 2명의 프론트엔드 개발자, 그리고 1명의 디자이너가 함께 제작한 페이지입니다.<br/>
            인터뷰 뱅크를 통해 더 나은 취업과 진로에 한 발짝 다가서길 기대하며, 여러분의 면접 준비를 응원합니다.<br/>
            인터뷰 뱅크와 함께 면접 준비의 여정을 시작 해보세요. 면접 기록을 정리하거나 다른 사람들의 경험을 접할 수 있습니다.<br/>
            앞으로의 기회들을 놓치지 마시고 인터뷰 뱅크가 여러분의 취업 여정에 도움이 되기를 바랍니다.<br/>
          </p>

          <p>
            우리는 당신의 면접 준비에 도움이 될 수 있어 기쁩니다. 즐거운 면접 준비 되세요!  
          </p>
        </div>
      </div>
    </section>
  )
}

export default InfoPage;