job_candidate_tools.remove_reference:
  path: '/job-candidate/{candidate}/remove/{field_name}/{target_id}'
  defaults:
    _controller: '\Drupal\job_candidate_tools\Controller\CandidateReferenceController::removeReference'
    _title: 'Remove Reference'
  requirements:
    _permission: 'edit any job_candidate content'
    candidate: '\d+'
    target_id: '\d+'


<?php

namespace Drupal\job_candidate_tools\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\node\Entity\Node;

class CandidateReferenceController extends ControllerBase {

  public function removeReference($candidate, $field_name, $target_id) {
    $candidate_node = Node::load($candidate);
    $target_node = Node::load($target_id);

    if (!$candidate_node || $candidate_node->bundle() != 'job_candidate') {
      $this->messenger()->addError($this->t('Invalid Job Candidate.'));
      return new RedirectResponse(\Drupal::request()->server->get('HTTP_REFERER'));
    }

    if (!$target_node) {
      $this->messenger()->addError($this->t('Target node not found.'));
      return new RedirectResponse(\Drupal::request()->server()->get('HTTP_REFERER'));
    }

    // 1️⃣ Update target node's status field to "Delete"
    if ($target_node->hasField('field_status')) {
      $terms = \Drupal::entityTypeManager()
        ->getStorage('taxonomy_term')
        ->loadByProperties([
          'name' => 'Delete',
          'vid' => 'status',
        ]);
      $delete_term = reset($terms);
      if ($delete_term) {
        $target_node->set('field_status', $delete_term->id());
        $target_node->save();
      }
    }

    // 2️⃣ Keep the reference — only mark as hidden via status
    $this->messenger()->addMessage($this->t('Item marked as deleted.'));

    return new RedirectResponse(\Drupal::request()->server->get('HTTP_REFERER'));
  }

}






Themes allow you to change the look and feel of your Drupal site. You can use
themes contributed by others or create your own.

WHAT TO PLACE IN THIS DIRECTORY?
--------------------------------

Placing downloaded and custom themes in this directory separates downloaded and
custom themes from Drupal core's themes. This allows Drupal core to be updated
without overwriting these files.

DOWNLOAD ADDITIONAL THEMES
--------------------------

Contributed themes from the Drupal community may be downloaded at
https://www.drupal.org/project/project_theme.

MULTISITE CONFIGURATION
-----------------------

In multisite configurations, themes found in this directory are available to
all sites. You may also put themes in the sites/all/themes directory, and the
versions in sites/all/themes will take precedence over versions of the same
themes that are here. Alternatively, the sites/your_site_name/themes directory
pattern may be used to restrict themes to a specific site instance.

MORE INFORMATION
-----------------

Refer to the "Appearance" section of the README.md in the Drupal root directory
for further information on customizing the appearance of Drupal with custom
themes.
