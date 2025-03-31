import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import { HerosHolder } from '@/components/heros-holder'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="relative">
      <HerosHolder />
      <div className="container flex flex-col gap-5 items-center">
        <div className="flex flex-col gap-5 max-w-2xl my-10">
          <h1 className="text-3xl font-bold">Noblesse</h1>
          <p className="text-sm font-light">
            Noblesse is an all-in-one cloud platform designed for developers, startups, and
            businesses that need scalable infrastructure for hosting, databases, storage, and
            version control. Inspired by Vercel, Firebase, Google Drive, and GitHub, Noblesse
            provides a seamless environment where users can deploy websites, manage databases, store
            files, and track project versions—all within a dynamic, containerized ecosystem powered
            by Docker.
            <br />
            <br />
            With Noblesse, users get auto-scaling hosting, serverless databases, secure cloud
            storage, and Git-like versioning, ensuring efficient resource management and seamless
            project collaboration. Whether you're a solo developer or an enterprise, Noblesse grows
            with your needs, offering on-demand expansion and per-user storage buckets that scale as
            your data increases.
            <br />
            <br />
            Built for performance, security, and ease of use, Noblesse is the future of self-hosted
            cloud infrastructure. 🚀
          </p>
          <h1 className="text-3xl font-bold">Key Features</h1>
          <ul className="list-disc pl-6 text-sm font-light space-y-2">
            <li>
              Self-hosted Solution: Keep full control of your data by hosting the platform on your
              own infrastructure.
            </li>
            <li>
              Deployment as a Service: Host static and dynamic web applications effortlessly,
              similar to Vercel.
            </li>
            <li>
              Database Management: Manage and store your databases with ease, providing a flexible
              backend.
            </li>
            <li>
              Cloud Storage: Use Noblesse as a storage solution, enabling file uploads, management,
              and retrieval similar to Google Drive or Firebase but borrowing concepts from github.
            </li>
            <li>
              Authentication & User Management: Securely handle user authentication and roles, this
              as alot behind it but for now ill keep it short.
            </li>
            <li>
              Extensibility: Easily integrate third-party services and build custom functionalities
              on top of Noblesse.
            </li>
            <li>
              Highly Configurable: Customize the platform to meet your unique project needs, this
              will be dependant on an if statement, if the structure starts of in block form will
              structure it to be customizable else this will be more like theme editing.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
