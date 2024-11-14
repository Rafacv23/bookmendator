export default function deleteAIModel() {
  const cachesToKeep = [""] // caches that we want to keep

  caches.keys().then((keyList) =>
    Promise.all(
      keyList.map((key) => {
        if (!cachesToKeep.includes(key)) {
          return caches.delete(key)
        }
      })
    )
  )
}
