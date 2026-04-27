const SW_PATH = '/sw.js'

export async function registerClinicalServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) {
    return null
  }
  try {
    const registration = await navigator.serviceWorker.register(SW_PATH, {
      scope: '/',
    })
    return registration
  } catch {
    return null
  }
}

export async function showNotificationViaWorker(options: {
  title: string
  body: string
  tag?: string
  requireInteraction?: boolean
  payload?: Record<string, unknown>
}): Promise<boolean> {
  const reg = await navigator.serviceWorker?.ready
  if (!reg?.active) {
    return false
  }
  reg.active.postMessage({
    type: 'SHOW_NOTIFICATION',
    title: options.title,
    body: options.body,
    tag: options.tag,
    requireInteraction: options.requireInteraction,
    payload: options.payload,
  })
  return true
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    return 'denied'
  }
  if (Notification.permission === 'granted') {
    return 'granted'
  }
  if (Notification.permission !== 'denied') {
    return Notification.requestPermission()
  }
  return Notification.permission
}

/** Creates a new OS notification on each call (uses the Notifications API, not push). */
export function showLocalDesktopNotification(options: {
  title: string
  body: string
  /** In-app path to open when the notification is clicked, e.g. `/patients/p-10021` */
  openPath?: string
}): boolean {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return false
  }
  const tag = `clinical-local-${Date.now()}`
  const n = new Notification(options.title, {
    body: options.body,
    icon: '/favicon.svg',
    tag,
  })
  n.onclick = () => {
    n.close()
    window.focus()
    if (options.openPath) {
      const path = options.openPath.startsWith('/') ? options.openPath : `/${options.openPath}`
      window.location.assign(path)
    }
  }
  return true
}
