import React from 'react'
import s from './ApplicationsPage.module.scss'
import { applicationAPI } from '../../servicesAPI/ApplicationService'

const ApplicationsPage = () => {
  const { data: application, error: GetApplicationError, isLoading } = applicationAPI.useGetApplicationQuery('')
  const [acceptApplication, { error: ApplicationAcceptError }] = applicationAPI.useAcceptApplicationMutation()
  const [deleteApplication, { error: ApplicationDeleteError }] = applicationAPI.useDeleteApplicationMutation()

  const acceptApplicationHandler = async (userId: number, pseudonym: string) => {
    await acceptApplication({ userId, pseudonym }).unwrap()
  }

  const deleteApplicationHandler = async (userId: number) => {
    await deleteApplication({ userId }).unwrap()
  }

  return (
    <div className={s.pageWrapper}>
      <div className={s.contentWrapper}>
        <div className={s.header}>
          <span>Заявки</span>
        </div>
        <div className={s.applicationsWrapper}>

          {application && application.applications.map(application => {
            return (
              <div key={application.id} className={s.applicationWrapper}>
                  <span className={s.nickname}>
                    {application.pseudonym}
                  </span>
                <div className={s.buttons}>
                  <button onClick={() => acceptApplicationHandler(application.userId, application.pseudonym)}
                          className={s.accept}>Принять
                  </button>
                  <button onClick={() => deleteApplicationHandler(application.userId)} className={s.reject}>Отклонить
                  </button>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </div>
  )
}

export default ApplicationsPage
