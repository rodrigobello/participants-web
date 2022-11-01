<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { ParticipantObject } from '../types/participant'
import SlideOver from './UI/SlideOver.vue'
import moment from 'moment'

const props = defineProps<{
  participant?: ParticipantObject,
}>()
const { participant } = toRefs(props)
const slideOver = ref<typeof SlideOver | null>(null)

const open = () => {
  if (slideOver.value) {
    slideOver.value.toggle(true)
  } else {
    console.error("Failed to call 'toggle' on unidefined component reference 'slideOver'")
  }
}

const formatDate = (date: string): string => moment(date).format("DD/MM/YYYY, h:mma")

defineExpose({
  open,
})
</script>

<template>
 <SlideOver ref="slideOver">
  <template #title>
    <h3 class="text-xl font-bold text-gray-900 sm:text-2xl" v-if="participant">
      {{ participant.OrganisationName }}
      <span class="ml-2.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 inline-block align-middle">
        {{ participant.Status }}
      </span>
    </h3>
    <p class="text-sm text-gray-500" v-if="participant">{{ participant.RegisteredName }}</p>
  </template>
  <template #content>
    <div v-if="participant">
      <div class="h-full overflow-y-auto bg-white">
        <div class="space-y-6 pb-16">
          <div>
            <dl class="space-y-4 mt-2">
              <div>
                <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Organisation Register</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">{{ participant.CompanyRegister }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Location</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">{{ participant.City }}, {{ participant.Country }}, {{ participant.Postcode }}</dd>
              </div>
            </dl>
          </div>
          <div>
            <dl class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
              <div class="flex justify-between py-3 text-sm font-medium">
                <dt class="text-gray-500">Registration Number</dt>
                <dd class="text-gray-900">{{ participant.RegistrationNumber || "N/A" }}</dd>
              </div>
              <div class="flex justify-between py-3 text-sm font-medium">
                <dt class="text-gray-500">Registration ID</dt>
                <dd class="text-gray-900">{{ participant.RegistrationId || "N/A" }}</dd>
              </div>
              <div class="flex justify-between py-3 text-sm font-medium">
                <dt class="text-gray-500">Registration Country</dt>
                <dd class="text-gray-900">{{ participant.CountryOfRegistration || "N/A" }}</dd>
              </div>
              <div class="flex justify-between py-3 text-sm font-medium">
                <dt class="text-gray-500">Created On</dt>
                <dd class="text-gray-900">{{ participant.CreatedOn ? formatDate(participant.CreatedOn) : "N/A" }}</dd>
              </div>
            </dl>
          </div>
          <div v-show="participant.AuthorisationServers && participant.AuthorisationServers.length > 0">
            <h3 class="font-medium text-gray-900 text-xl">Authorisation Servers</h3>
            <div v-for="authorisationServer in participant.AuthorisationServers" class="pt-6">
              <div>
                <div class="flex items-center">
                  <h3 class="text-md font-medium text-gray-900">{{ authorisationServer.CustomerFriendlyName }}</h3>
                  <span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 ml-2" v-show="authorisationServer.SupportsCiba">Ciba</span>
                    <span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 ml-2" v-show="authorisationServer.SupportsDCR">DCR</span>
                    <span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 ml-2" v-show="authorisationServer.AutoRegistrationSupported">Automatic Onboarding</span>
                </div>
                <p class="text-sm text-gray-500">{{ participant.RegisteredName }}</p>
              </div>
              <div v-show="authorisationServer.ApiResources && authorisationServer.ApiResources.length > 0">
                <dl class="space-y-4">
                  <div>
                    <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 mt-3">API Resources</dt>
                    <dd class="text-sm text-gray-900 sm:col-span-2">
                      <ul role="list">
                        <li v-for="resource in authorisationServer.ApiResources" class="pb-0.5">
                          <div class="flex items-center space-x-4">
                            <div class="min-w-0 flex-1">
                              <p class="truncate text-sm font-medium text-gray-900">
                                {{ resource.ApiFamilyType }}
                              </p>
                              <p class="truncate text-xs text-gray-500" v-for="endpoint in resource.ApiDiscoveryEndpoints">
                                {{ endpoint.ApiEndpoint }}
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <div v-show="participant.OrgDomainClaims && participant.OrgDomainClaims.length > 0">
            <h3 class="font-medium text-gray-900 text-xl">Authority Domain Claims</h3>
            <ul role="list" class="mt-2">
              <li v-for="domainClaim in participant.OrgDomainClaims">
                <div class="flex items-center space-x-4 py-1">
                  <div class="min-w-0 flex-1">
                    <p class="truncate text-sm font-medium text-gray-900">{{ domainClaim.AuthorisationDomainName }}</p>
                    <p class="truncate text-sm text-gray-500">{{ domainClaim.AuthorityName }}</p>
                  </div>
                  <div>
                    <span class="ml-2.5 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      {{ domainClaim.Status }}
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div v-show="participant.OrgDomainRoleClaims && participant.OrgDomainRoleClaims.length > 0">
            <h3 class="font-medium text-gray-900 text-xl">Organisation Role Claims</h3>
            <ul role="list" class="mt-2">
              <li v-for="roleClaim in participant.OrgDomainRoleClaims">
                <div class="flex items-center space-x-4 py-1">
                  <div class="min-w-0 flex-1">
                    <p class="truncate text-sm font-medium text-gray-900">{{ roleClaim.AuthorisationDomain }}</p>
                    <p class="truncate text-sm text-gray-500">{{ roleClaim.Role }}</p>
                  </div>
                  <div>
                    <span class="ml-2.5 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      {{ roleClaim.Status }}
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
 </SlideOver>
</template>
